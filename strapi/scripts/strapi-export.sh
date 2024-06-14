npx strapi config:dump -f 'strapi-config.json'

export_config () {
  jq ".[] | select(.key==\"$1\")" strapi-config.json > export/"$1".json
}

export_config "plugin_content_manager_configuration_components::branding.branding"
export_config "plugin_content_manager_configuration_components::branding.intro"
export_config "plugin_content_manager_configuration_components::data-connection"
export_config "plugin_content_manager_configuration_content_types::api::flix.flix"
export_config "plugin_content_manager_configuration_content_types::api::side-note.side-note"

rm -rf strapi-config.json
