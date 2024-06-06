npx strapi config:dump -f 'strapi-config.json'

strapi_import () {
  jq "[.[] | select(.key==\"$1\") |= input]" strapi-config.json export/"$1".json \
    > strapi-config.tmp && mv strapi-config.tmp strapi-config.json
}

strapi_import "plugin_content_manager_configuration_components::branding.branding"
strapi_import "plugin_content_manager_configuration_components::branding.intro"
strapi_import "plugin_content_manager_configuration_components::data-connection"
strapi_import "plugin_content_manager_configuration_content_types::api::flix.flix"
strapi_import "plugin_content_manager_configuration_content_types::api::side-note.side-note"

npx strapi config:restore -f 'strapi-config.json'

rm -rf strapi-config.json
