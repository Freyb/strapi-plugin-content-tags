# UNMAINTAINED
Unfortunately, I'm no longer working on Strapi projects. Feel free to fork the project, or send PRs.

# Strapi Plugin Content Tags

A Strapi plugin that allows you to add custom tags to your content.

## Installation

```bash
# using yarn
yarn add strapi-plugin-content-tags

# using npm
npm install strapi-plugin-content-tags --save
```

To allow tags on a collection type, edit \
`./src/api/[content-type-name]/content-types/[content-type-name]/schema.json`

```json
{
  "pluginOptions": {
    "i18n": { ... },
    "content-tags": {
      "fieldName": "Tags",
      "tags": {
        "None": { "color": "neutral" },
        "Done": { "color": "success" },
        "In progress": { "color": "primary" },
        "Error": { "color": "danger" }
      },
      "defaultTag": "None"
    }
  },

  ...

  "attributes": {
    ...
    "Tags": {
      "type": "customField",
      "customField": "plugin::content-tags.content-tags"
    }
    ...
  }
}
```

The `pluginOption` section lets you configure the the tags of the collection type.
- `fieldName` is a reference to the field you have specified in the `attributes` section.
- `tags` is an objects of which the keys are the labels of the tags and the values need to contain the following properties: 
  - `color`: The display color of the badge. It is passed to a [Status component](https://design-system-git-main-strapijs.vercel.app/?path=/docs/design-system-components-status--base). \
  Possible values: alternative, danger, neutral, primary, secondary, success, warning.
- `defaultTag`: A key in `tags` that will be assigned to entities by default.

In the `attributes` section you need to define a field, using the provided custom component. You can do that by either editing `schema.json` manually or adding it through Content-Type Builder.

![](https://raw.githubusercontent.com/Freyb/strapi-plugin-content-tags/main/images/content_tags_list_view.png)

## Todo
- Add an editor to Advanced settings of Content-Type Builder where you can setup the tags. 
