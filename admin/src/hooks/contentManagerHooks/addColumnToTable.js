import React from 'react';
import get from 'lodash/get';
import styled from 'styled-components';
import { Status, Typography } from '@strapi/design-system';
import pluginId from '../../pluginId';

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
        name: pluginOptions.fieldName,
        cellFormatter(cellData) {
          const tagKey =
            cellData[pluginOptions.fieldName] ?? pluginOptions.defaultTag;
          const tagProperties =
            pluginOptions.tags[tagKey] ||
            pluginOptions.tags[pluginOptions.defaultTag];
          const tagColor = tagProperties.color;

          return (
            <StyledStatus showBullet={false} variant={tagColor} size="S">
              <Typography fontWeight="bold" textColor={`${tagColor}700`}>
                {tagKey}
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
