import { ActionIcon, Box, Center, Text, Textarea, LoadingOverlay, Paper } from '@mantine/core';
import { BiPaperPlane } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { useChat } from '../hooks/useChat';
import { RootState } from '../state/store';

const ChatBox = () => {
  const { input, messagesEndRef, onInputChange, onSubmit, catchEnter, getMessages } = useChat();

  const chat = useSelector((state: RootState) => state.chat);
  const user = useSelector((state: RootState) => state.user);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={(theme) => ({
          maxHeight: '90vh',
          minHeight: '90vh',
          paddingTop: '20vh',
          display: 'flex',
          flexDirection: 'column-reverse',
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
        <div ref={messagesEndRef} />

        {chat.messages.map((x) => (
          <Paper
            key={x.id}
            padding="sm"
            shadow="xs"
            radius="md"
            mb={10}
            mx={10}
            ml={user.socketId === x.socketId ? 'auto' : 10}
            sx={{ width: '70%' }}
          >
            <Text size="xs" mb={5} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <b>{x.username}</b> {moment(x.date).format('Do MMMM YYYY, h:mm a')}
            </Text>
            {x.body.split('\n').map((y) => (
              <Text>{y}</Text>
            ))}
          </Paper>
        ))}

        <Text
          mb={10}
          ml={15}
          size="xs"
          sx={{
            width: 'fit-content',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
          onClick={getMessages}
        >
          Load more messages
        </Text>
      </Box>

      <Box
        sx={(theme) => ({
          height: '10vh',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        })}
      >
        <form onSubmit={onSubmit} style={{ height: '100%' }}>
          <Box sx={{ display: 'flex', height: '100%' }}>
            <Textarea
              sx={{
                width: '100%',
                paddingTop: 5,
                paddingBottom: 5,
              }}
              styles={{
                wrapper: { height: '100%' },
                input: { height: '100%' },
              }}
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={catchEnter}
            />
            <Center sx={{ padding: 15 }}>
              <ActionIcon onClick={onSubmit}>
                <BiPaperPlane style={{ width: 36, height: 36 }} />
              </ActionIcon>
            </Center>
          </Box>
          <input type="submit" style={{ display: 'none' }} />
        </form>
      </Box>

      <LoadingOverlay visible={chat.loading} />
    </Box>
  );
};

export default ChatBox;
