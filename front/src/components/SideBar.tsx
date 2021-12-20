import { FC } from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';
import { Box, Center, Divider, Text, Menu, ColorScheme } from '@mantine/core';
import { useSelector } from 'react-redux';

import { RootState } from '../state/store';

interface Props {
  colorMode: 'dark' | 'light';
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setColorMode: (val: ColorScheme | ((prevState: ColorScheme) => ColorScheme)) => void;
}

const SideBar: FC<Props> = ({ colorMode, setColorMode, setModalOpen }) => {
  const user = useSelector((state: RootState) => state.user);
  const chat = useSelector((state: RootState) => state.chat);

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        height: '100%',
      })}
    >
      <Center sx={{ width: '100%', height: '5%', position: 'relative' }}>
        <Text size="md">{user.name}</Text>
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
      <Text align="center">Connected users:</Text>
      <Box
        sx={(theme) => ({
          overflowY: 'auto',
          '::-webkit-scrollbar': {
            width: 12,
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[5],
            borderRadius: 6,
            border: '3px solid transparent',
            backgroundClip: 'content-box',
          },
        })}
      >
        {chat.users
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((x) => (
            <Text key={x.socketId} align="center">
              {x.name}
              {x.socketId === user.socketId && ' (You)'}
            </Text>
          ))}
      </Box>
    </Box>
  );
};

export default SideBar;
