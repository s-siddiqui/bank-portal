import("./App").then(({ default: App }) => {
  const { AppRegistry } = require("react-native");
  const React = require("react");
  const { name } = require("../app.json");
  const { View } = require("react-native");

  AppRegistry.registerComponent(name, () => () => (
    <View style={{ flex: 1 }}>
      <App />
    </View>
  ));

  AppRegistry.runApplication(name, {
    rootTag: document.getElementById("root"),
  });
});
