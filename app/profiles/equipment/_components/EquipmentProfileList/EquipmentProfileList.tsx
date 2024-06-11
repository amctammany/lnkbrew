import { ButtonLink, IconButtonLink } from "@/components/Button";
import { List } from "@/components/List/List";
import { Section } from "@/components/Section";
import { EquipmentProfile } from "@prisma/client";
import { EquipmentProfileListItem } from "./EquipmentProfileListItem";
import { AddIcon } from "@/components/Icon/AddIcon";
export type EquipmentProfileListProps = {
  profiles?: EquipmentProfile[];
};
const EquipmentProfilesActions = () => {
  return (
    <>
      <IconButtonLink Icon={AddIcon} href="/profiles/equipment/new">
        New
      </IconButtonLink>
    </>
  );
};

export const EquipmentProfileList = ({
  profiles,
}: EquipmentProfileListProps) => {
  return (
    <Section
      variant="primary"
      header="Equipment Profiles"
      actions={<EquipmentProfilesActions />}
    >
      <List>
        {(profiles || []).map((profile) => (
          <EquipmentProfileListItem key={profile?.id} profile={profile} />
        ))}
      </List>
    </Section>
  );
};
