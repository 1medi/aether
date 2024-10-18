import { Drawer, DrawerItem, DrawerGroup } from '@ui-kitten/components';
import { Image } from 'react-native';

export default function Hamburger() {
  return (
    <>
    <Drawer>

  <DrawerItem title='Option 1'/>
  <DrawerGroup title='Group'>
    <DrawerItem title='Option 1.1'/>
    <DrawerItem title='Option 1.2'/>
  </DrawerGroup>
</Drawer>
    </>

  )
}

