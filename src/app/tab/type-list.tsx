import { For, SimpleGrid, Tabs } from "@chakra-ui/react";

export const TabTypeList = () => {
  return (
    <SimpleGrid columns={2} gap="14" width="full">
      <For each={["line", "subtle", "enclosed", "outline", "plain"]}>
        {(variant) => (
          <Tabs.Root key={variant} defaultValue="members" variant={variant}>
            <Tabs.List>
              <Tabs.Trigger value="members">Members</Tabs.Trigger>
              <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
              <Tabs.Trigger value="tasks">Settings</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="members">
              Manage your team members
            </Tabs.Content>
            <Tabs.Content value="projects">Manage your projects</Tabs.Content>
            <Tabs.Content value="tasks">
              Manage your tasks for freelancers
            </Tabs.Content>
          </Tabs.Root>
        )}
      </For>
    </SimpleGrid>
  );
};
