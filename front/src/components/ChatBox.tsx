import { Center, Box, ActionIcon, Textarea } from '@mantine/core';
import { BiPaperPlane } from 'react-icons/bi';

import { useChat } from '../hooks/useChat';

const ChatBox = () => {
  const { message, onMessageChange, onSubmit, catchEnter } = useChat();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flex: 11 }}></Box>
      <Box
        sx={(theme) => ({
          flex: 1,
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        })}
      >
        <form onSubmit={onSubmit}>
          <Box sx={{ display: 'flex' }}>
            <Textarea
              sx={{
                width: '100%',
                paddingTop: 5,
                paddingBottom: 5,
              }}
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              onKeyDown={catchEnter}
            />
            <Center sx={{ padding: 15 }}>
              <ActionIcon type="submit">
                <BiPaperPlane style={{ width: 36, height: 36 }} />
              </ActionIcon>
            </Center>
          </Box>
          <input type="submit" style={{ display: 'none' }} />
        </form>
      </Box>
    </Box>
  );
};

export default ChatBox;
