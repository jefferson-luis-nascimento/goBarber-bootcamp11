import React from 'react';
import { useTransition } from 'react-spring';

import { Container } from './styles';

import Toast from './Toast';

import { ToastMessage } from '../../hooks/toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0, transition: 'opacity 0.2s' },
      enter: { right: '0%', opacity: 1, transition: 'opacity 0.2s' },
      leave: { right: '-120%', opacity: 0, transition: 'opacity 0.2s' },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item: message, key, props }) => (
        <Toast key={key} style={props} message={message} />
      ))}
    </Container>
  );
};

export default ToastContainer;
