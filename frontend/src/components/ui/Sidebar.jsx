import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react"
import { Menu } from "lucide-react"
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <Drawer.Root>
      <div
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          zIndex: 1000,
        }}
      >
        <Drawer.Trigger asChild>
          <Button variant="outline" size="sm">
            <Menu size={20} />
          </Button>
        </Drawer.Trigger>
      </div>

      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Insightboard</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <p style={{marginBottom:20, marginTop:20}}><Link style={{ color: "#ffffff"}} to="/">Dashboard</Link></p>
              <p style={{marginBottom:20}}><Link style={{ color: "#ffffff"}} to="/add">Add Tasks</Link></p>
              <p style={{marginBottom:20}}><Link style={{ color: "#ffffff"}} to="/view">View Tasks</Link></p>
            </Drawer.Body>

            <Drawer.Footer>
              {/* <Button variant="outline">Cancel</Button>
              <Button>Save</Button> */}
            </Drawer.Footer>

            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default Sidebar
