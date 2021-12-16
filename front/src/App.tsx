import { useState } from 'react';
import { MantineProvider, Box, Grid, Col } from '@mantine/core';

import { useApp } from './hooks/useApp';
import SideBar from './components/SideBar';
import ChatBox from './components/ChatBox';
import NameChangeModal from './components/NameChangeModal';

import { User } from './Types';

const App = () => {
  const { colorMode, setColorMode } = useApp();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <MantineProvider theme={{ colorScheme: colorMode }}>
      <Box
        sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], height: '100vh' })}
      >
        <Grid gutter={0} sx={{ height: '100%' }}>
          <Col span={4} xs={4} md={3} lg={2} xl={1.5}>
            <SideBar colorMode={colorMode} setModalOpen={setModalOpen} setColorMode={setColorMode} />
          </Col>
          <Col span={8} xs={8} md={9} lg={10} xl={10.5}>
            <ChatBox />
          </Col>
        </Grid>

        <NameChangeModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </Box>
    </MantineProvider>
  );
};

export default App;
