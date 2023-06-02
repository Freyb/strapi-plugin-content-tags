import { useEffect, useState } from 'react';
import { request, useNotification } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';

const fetchConfig = async () => {
  const data = await request(`/${pluginId}/config`, {
    method: 'GET',
  });

  return data ?? {};
};

const useConfig = () => {
  const toggleNotification = useNotification();
  const [isLoading, setIsLoading] = useState(true);
  const [config, setConfig] = useState({});

  useEffect(() => {
    fetchConfig()
      .then((config) => {
        setConfig(config);
      })
      .catch(() => {
        toggleNotification({
          type: 'warning',
          message: { id: 'notification.error' },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [toggleNotification]);

  return { config, isLoading };
};

export default useConfig;
