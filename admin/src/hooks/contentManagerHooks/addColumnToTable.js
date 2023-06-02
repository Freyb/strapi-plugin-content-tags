import React from 'react';
import get from 'lodash/get';
import styled from 'styled-components';
import { Status, Typography, Loader } from '@strapi/design-system';
import pluginId from '../../pluginId';
import useConfig from '../useConfig';
import { emptyTagProperties } from '../../constants';

const StyledStatus = styled(Status)`
  width: min-content;
`;

const addColumnToTableHook = ({ displayedHeaders, layout }) => {
  const pluginOptions = get(layout, `contentType.pluginOptions.${pluginId}`);
  const tagsEnabled = !!pluginOptions;

  if (!tagsEnabled) {
    return { displayedHeaders, layout };
  }

  return {
    displayedHeaders: [
      ...displayedHeaders,
      {
        key: '__contenttags_key__',
        fieldSchema: { type: 'string' },
        metadatas: {
          label: 'Tags',
          searchable: true,
          sortable: true,
        },
        name: 'content-tags',
        cellFormatter(cellData) {
          const { config, isLoading: configIsLoading } = useConfig();

          if (configIsLoading) return <Loader small>Loading content...</Loader>;

          const tagKey = cellData[pluginOptions.fieldName] ?? '';
          const tagProperties = tagKey
            ? config.tags[tagKey]
            : emptyTagProperties;
          const tagLabel = tagProperties.label;
          const tagColor = tagProperties.color;

          return (
            <StyledStatus showBullet={false} variant={tagColor} size="S">
              <Typography fontWeight="bold" textColor={`${tagColor}700`}>
                {tagLabel}
              </Typography>
            </StyledStatus>
          );
        },
      },
    ],
    layout,
  };
};

export default addColumnToTableHook;
