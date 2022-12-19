import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

const commonToastProps: UseToastOptions = {
  duration: 9000,
  isClosable: true,
  position: 'top',
};

const showSuccess = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  toast({
    title: title,
    description: message,
    status: 'success',
    ...commonToastProps,
  });
};

const showError = ({ title, message }: { title: string; message: string }) => {
  toast({
    title: title,
    description: message,
    status: 'error',
    ...commonToastProps,
  });
};

export { showSuccess, showError };
