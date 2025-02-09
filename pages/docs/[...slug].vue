<script setup lang="ts">
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "~/components/ui/sidebar";
import { ChevronRight } from "lucide-vue-next";

const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("docs").path(route.path).first();
});

const { data: documentationRoutes } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("docs");
});
</script>

<template>
  <main class="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
    <div
      class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
    >
      <div class="flex flex-col">
        <SidebarProvider>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Documentation</SidebarGroupLabel>
              <SidebarMenu>
                <Collapsible
                  v-for="item in documentationRoutes?.[0].children"
                  :key="item.title"
                  as-child
                  :default-open="true"
                  class="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger as-child>
                      <SidebarMenuButton
                        :tooltip="item.title"
                        class="hover:bg-accent hover:text-accent-foreground font-semibold"
                      >
                        <component :is="item.icon" />
                        <span>{{ item.title }}</span>
                        <ChevronRight
                          class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem
                          v-for="child in item.children"
                          :key="child.title"
                        >
                          <SidebarMenuSubButton
                            :class="{
                              'is-active': child.path === route.path,
                            }"
                            class="hover:bg-accent hover:text-accent-foreground"
                            as-child
                          >
                            <NuxtLink :to="child.path">
                              {{ child.title }}
                            </NuxtLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </SidebarProvider>
      </div>
      <div v-if="page">
        <ProseH1>{{ page.title }}</ProseH1>
        <p class="text-xl text-muted-foreground mt-2" v-if="page.description">
          {{ page.description }}
        </p>
        <br />
        <ContentRenderer v-if="page" :value="page" :prose="true" />
      </div>
      <p v-else>Page not found.</p>
    </div>
  </main>
</template>
