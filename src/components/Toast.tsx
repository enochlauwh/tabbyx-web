import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

const commonToastProps: UseToastOptions = {
  duration: 9000,
  isClosable: true,
  position: 'top',
};

const showSuccess = (message: string) => {
  toast({
    description: message,
    status: 'success',
    ...commonToastProps,
  });
};

const showError = (message: string) => {
  toast({
    description: message,
    status: 'error',
    ...commonToastProps,
  });
};

export { showSuccess, showError };
