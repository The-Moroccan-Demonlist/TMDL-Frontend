"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useDialogStore } from "@/stores/dialog-store"
import { CreateClassicLevelDialog } from "@/components/classic/create-level"

export default function Levels() {
  const setDialogOpen = useDialogStore(state => state.setDialogOpen)

  return (
    <>
      <Tabs defaultValue="classic">
        <TabsList>
          <TabsTrigger value="classic">Classic</TabsTrigger>
          <TabsTrigger value="platformer">Platformer</TabsTrigger>
        </TabsList>
        <TabsContent value="classic">
          <Button onClick={() => setDialogOpen(true)}>Create Classic Level</Button>
        </TabsContent>
        <TabsContent value="platformer">
          Change your password here.
        </TabsContent>
      </Tabs>

      <CreateClassicLevelDialog />
    </>
  )
}
