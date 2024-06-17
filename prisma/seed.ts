import {
  //PrismaClient,
  HopUsage,
  StyleCategory,
  YeastFlocculation,
  YeastForm,
  YeastType,
  //StyleCategory,
  //YeastForm,
  //YeastType,
  //YeastFlocculation,
  //HopSensoryPanel,
} from "@prisma/client";
import slugify from "slugify";
import hops from "../data/hops.json";
//import hopSuppliers from "../data/hopsuppliers.json";
import yakima from "../data/yakima.json";
import yeasts from "../data/yeasts.json";
import grains from "../data/grains.json";
import styles from "../data/styles.json";
import { prisma } from "../lib/client";

slugify.extend({ "®": "", "™": "" });
async function main() {
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.userPreferences.deleteMany();
  await prisma.user.deleteMany();
  await prisma.hopSensoryPanel.deleteMany();
  await prisma.hop.deleteMany();
  await prisma.fermentable.deleteMany();
  await prisma.yeast.deleteMany();
  await prisma.style.deleteMany();
  await prisma.waterProfile.deleteMany();
  await prisma.equipmentProfile.deleteMany();
  await prisma.mashProfile.deleteMany();

  //const admin = await prisma.user.upsert({
  //where: { email: "admin@lnkbrewing.com" },
  //update: {},
  //create: {
  //email: "admin@lnkbrewing.com",
  //name: "Alex",
  //username: "admin",
  //},
  //});
  await prisma.style.createMany({
    data: styles.map(({ category, ...style }) => ({
      ...style,
      subcategoryId: parseInt(style.subcategoryId, 10),
      category: StyleCategory[category.toLowerCase() as StyleCategory],
    })),
  });
  await prisma.waterProfile.create({
    data: {
      name: "RO",
      slug: slugify("RO", { lower: true }),
      description: "Reverse Osmosis",
      calcium: 1,
      magnesium: 0,
      sulfate: 1,
      chloride: 4,
      bicarbonate: 16,
      sodium: 8,
    },
  });
  const jb = await prisma.waterProfile.create({
    data: {
      name: "Juicy Bits",
      slug: slugify("Juicy Bits", { lower: true }),
      description: "Juicy!",
      calcium: 140,
      magnesium: 0,
      sulfate: 90,
      chloride: 175,
      bicarbonate: 0,
      sodium: 0,
      forks: {
        create: {
          //forks: [],
          name: "amctammany Juicy Bits",
          slug: slugify("amctammamy Juicy Bits", { lower: true }),
          description: "Juicy!",
          calcium: 150,
          magnesium: 0,
          sulfate: 92,
          chloride: 165,
          bicarbonate: 0,
          sodium: 0,
        },
      },
    },
  });

  await prisma.waterProfile.create({
    data: {
      name: "Good",
      slug: slugify("Good", { lower: true }),
      description: "good",
      calcium: 10,
      magnesium: 20,
      sulfate: 50,
      chloride: 100,
      bicarbonate: 6,
      sodium: 15,
    },
  });
  await prisma.equipmentProfile.create({
    data: {
      name: "Anvil 10.5",
      slug: slugify("Anvil 10.5", { lower: true }),
      description: "Anvil Foundry 10.5",
      boilOffRate: 0.45,
      trubLoss: 0.35,
      mashLoss: 0,
      fermenterLoss: 0.5,
      batchVolume: 3.4,
      preboilVolume: 4.5,
      boilVolume: 4.5,
      mashEfficiency: 0.68,
      brewEfficiency: 0.5,
      boilTime: 60,
      forks: {
        create: {
          name: "Anvil 10.5 240V",
          slug: slugify("Anvil 10.5 240V", { lower: true }),
          description: "Anvil Foundry 10.5 at 240 V",
          boilOffRate: 0.55,
          trubLoss: 0.35,
          mashLoss: 0,
          fermenterLoss: 0.5,
          batchVolume: 6.4,
          preboilVolume: 4.5,
          boilVolume: 4.5,
          mashEfficiency: 0.72,
          brewEfficiency: 0.62,
          boilTime: 60,
        },
      },
    },
  });

  await prisma.equipmentProfile.create({
    data: {
      name: "Anvil 6.5",
      slug: slugify("Anvil 6.5", { lower: true }),
      description: "Anvil Foundry",
      boilOffRate: 0.45,
      trubLoss: 0.35,
      mashLoss: 0,
      fermenterLoss: 0.5,
      batchVolume: 2.4,
      preboilVolume: 2.5,
      boilVolume: 2.5,
      mashEfficiency: 0.68,
      brewEfficiency: 0.5,
      boilTime: 60,
    },
  });

  await prisma.mashProfile.create({
    data: {
      name: "Max Fermentability",
      slug: slugify("Max Fermentability", { lower: true }),
      description: "Maximum Fermentability",
      steps: { create: [{ temperature: 152, time: 60 }] },
      forks: {
        create: {
          name: "Max Fermentability (copy)",
          slug: slugify("Max Fermentability (copy)", { lower: true }),
          description: "Maximum Fermentability Copy",
          steps: { create: [{ temperature: 154, time: 60 }] },
        },
      },
    },
  });
  await prisma.mashProfile.create({
    data: {
      name: "Medium Fermentability with Mashout",
      slug: slugify("Medium Fermentability with Mashout", { lower: true }),
      description: "Medium Fermentability",
      steps: {
        create: [
          { temperature: 152, time: 60 },
          { temperature: 168, time: 10 },
        ],
      },
    },
  });

  /**
  await prisma.mashProfile.deleteMany();
  await prisma.hopIngredient.deleteMany();

  await prisma.recipeOtherIngredient.deleteMany();
  await prisma.otherIngredient.deleteMany();
  await prisma.fermentableIngredient.deleteMany();
  await prisma.yeastIngredient.deleteMany();
  await prisma.recipe.deleteMany();
  */
  //await prisma.user.deleteMany();
  //const alex = await prisma.user.upsert({
  //where: { email: "alex@gmail.com" },
  //update: {},
  //create: {
  //email: "alex@gmail.com",
  //name: "Alex",
  //username: "alex",
  //recipes: {
  //create: [
  //{
  //name: "First Recipe",
  //slug: "first-recipe",
  //description: "Desc",
  //},
  //],
  //},
  //},
  //});

  //const kathy = await prisma.user.upsert({
  //where: { email: "kathy@gmail.com" },
  //update: {},
  //create: {
  //email: "kathy@gmail.com",
  //name: "Kathy",
  //username: "kathy",
  //recipes: {
  //create: [
  //{
  //name: "Second Recipe",
  //slug: "second-recipe",
  //description: "Desc",
  //},
  //{
  //name: "Final Recipe",
  //slug: "final-recipe",
  //description: "Desc",
  //},
  //],
  //},
  //},
  //});
  /**
  await prisma.waterProfile.create({
    data: {
      name: "Good",
      slug: slugify("Good", { lower: true }),
      description: "good",
      calcium: 10,
      magnesium: 20,
      sulfate: 50,
      chloride: 100,
      bicarbonate: 6,
      sodium: 15,
    },
  });
  await prisma.equipmentProfile.create({
    data: {
      name: "Anvil 10.5",
      slug: slugify("Anvil 10.5", { lower: true }),
      description: "Anvil Foundry",
      boilOffRate: 0.5,
      trubLoss: 0.55,
      mashLoss: 0,
      fermenterLoss: 0.5,
      batchVolume: 4.4,
      preboilVolume: 6.5,
      boilVolume: 6.5,
      brewEfficiency: 0.7,
      mashEfficiency: 0.6,
      boilTime: 60,
    },
  });
  await prisma.otherIngredient.createMany({
    data: [
      {
        name: "Baking Soda (NaHCO3)",
        slug: slugify("Baking Soda (NaHCO3)", { lower: true }),
        type: "agent",
      },
      {
        name: "Gypsum (CaSO4)",
        slug: slugify("Gypsum (CaSO4)", { lower: true }),
        type: "agent",
      },
    ],
  });
  */

  await prisma.yeast.createMany({
    data: yeasts.map(
      ({ type, form, flocculation, temp, attenuation, notes, ...yeast }) => ({
        ...yeast,
        type: YeastType[type as YeastType],
        flocculation:
          YeastFlocculation[
            flocculation?.replace(" ", "") as YeastFlocculation
          ],
        form: YeastForm[form as YeastForm],
        attenuation: attenuation / 100,
        tempLow: temp[0],
        tempHigh: temp[1],
        notes: notes[0],
        usage: notes[1],
      })
    ),
  });

  await prisma.hop.createMany({
    data: hops.map(({ aromas, usage, flavorMap, ...hop }: any) => ({
      flavor: aromas,
      ...hop,

      slug: slugify(hop.name, { lower: true }),
      usage: HopUsage[usage?.toLowerCase() as HopUsage] || HopUsage.dual,
    })),
  });
  await prisma.fermentable.createMany({
    data: grains.map((grain) => ({
      ...grain,
      slug: slugify(grain.name, { lower: true }),
    })),
  });

  const data = await Promise.allSettled(
    yakima.map(async ({ flavorMap, aromas, ...hop }) => {
      return await prisma.hop.upsert({
        where: {
          slug: hop.slug,
        },
        update: {
          ...hop,
          HopSensoryPanel: {
            upsert: {
              where: {
                slug: hop.slug,
              },
              update: { ...flavorMap },
              create: {
                ...flavorMap,
              },
            },
          },
          flavor: aromas,
        },
        create: {
          ...hop,
          flavor: aromas,
          HopSensoryPanel: {
            create: flavorMap,
          },
        },
        include: {
          HopSensoryPanel: true,
        },
      });
    })
  );
  /**

  await prisma.hopSupplier.createMany({
    data: hopSuppliers.map((sup) => ({
      ...sup,
      slug: slugify(sup.name, { lower: true }),
    })),
  });
  await prisma.style.createMany({
    data: styles.map(({ category, ...style }) => ({
      ...style,
      subcategoryId: parseInt(style.subcategoryId, 10),
      category: StyleCategory[category.toLowerCase() as StyleCategory],
    })),
  });
  */
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
