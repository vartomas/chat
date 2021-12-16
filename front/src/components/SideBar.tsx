import { FC } from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';
import { Box, Center, Divider, Text, Menu } from '@mantine/core';

import { ColorScheme } from '../App';
import { User } from '../App';

interface Props {
  name: string;
  users: User[];
  colorMode: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setColorMode: (val: ColorScheme | ((prevState: ColorScheme) => ColorScheme)) => void;
}

const SideBar: FC<Props> = ({ name, users, colorMode, setModalOpen, setColorMode }) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        height: '100%',
      })}
    >
      <Center sx={{ width: '100%', height: '5%', position: 'relative' }}>
        <Text size="md">{name}</Text>
        <Box sx={{ position: 'absolute', right: 6 }}>
          <Menu transition="rotate-right" transitionDuration={100} transitionTimingFunction="ease">
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item
              icon={<FaUserEdit />}
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Name
            </Menu.Item>
            <Menu.Item
              icon={colorMode === 'dark' ? <BsFillSunFill /> : <BsFillMoonFill />}
              onClick={() => setColorMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            >
              Color theme
            </Menu.Item>
          </Menu>
        </Box>
      </Center>
      <Divider />
      <Box>
        {users.map((x) => (
          <Text key={x.socketId}>{x.name}</Text>
        ))}
      </Box>
    </Box>
  );
};

export default SideBar;
