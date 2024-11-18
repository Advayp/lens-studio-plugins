import PanelPlugin from "LensStudio:PanelPlugin";
import * as Ui from "LensStudio:Ui";

export class MarkdownRenderer extends PanelPlugin {
  static descriptor() {
    return {
      id: "Com.Advay.MarkdownRenderer",
      interfaces: PanelPlugin.descriptor().interfaces,
      name: "Markdown",
      description: "Renders Markdown",
      dependencies: [Ui.IGui],
    };
  }

  constructor(pluginSystem) {
    super(pluginSystem);

    this.pluginSystem = pluginSystem;
    this.connections = [];
  }

  createWidget(parent) {
    const mainWidget = Ui.Widget.create(parent);

    const mainLayout = Ui.BoxLayout.create();

    mainLayout.setDirection(Ui.Direction.TopToBottom);

    const stackedWidget = Ui.StackedWidget.create(mainWidget);

    this.createTextEditTab(stackedWidget, mainWidget);

    mainLayout.setContentsMargins(
      Ui.Sizes.DialogContentMargin,
      Ui.Sizes.DialogContentMargin,
      Ui.Sizes.DialogContentMargin,
      Ui.Sizes.DialogContentMargin
    );

    mainLayout.addWidget(stackedWidget);
    mainWidget.layout = mainLayout;

    let foo = "";

    return mainWidget;
  }

  createTextEditTab(stackedWidget, widget) {
    const textEditTabWidget = Ui.Widget.create(widget);
    const textEditTabLayout = Ui.BoxLayout.create();
    textEditTabLayout.setDirection(Ui.Direction.TopToBottom);
    const lineEditLabel = Ui.Label.create(widget);
    lineEditLabel.foregroundRole = Ui.ColorRole.BrightText;
    const textEditLabel = Ui.Label.create(widget);
    textEditLabel.foregroundRole = Ui.ColorRole.BrightText;

    const textEditArea = Ui.TextEdit.create(widget);
    textEditArea.placeholderText = "Enter text here...";
    textEditArea.foregroundRole = Ui.ColorRole.PlaceholderText;
    textEditArea.setFixedHeight(Ui.Sizes.TextEditHeight);
    this.connections.push(
      textEditArea.onTextChange.connect(() => {
        textEditLabel.text = "Your input: " + textEditArea.plainText;
      })
    );
    const lineEditField = Ui.LineEdit.create(widget);
    lineEditField.placeholderText = "Enter text here...";
    lineEditField.foregroundRole = Ui.ColorRole.PlaceholderText;
    this.connections.push(
      lineEditField.onTextChange.connect((text) => {
        lineEditLabel.text = "Your input: " + text;
      })
    );

    const clearButton = Ui.PushButton.create(widget);
    clearButton.text = "Clear";
    clearButton.foregroundRole = Ui.ColorRole.Button;
    this.connections.push(
      clearButton.onClick.connect(() => {
        textEditArea.plainText = "";
        lineEditField.text = "";
        lineEditLabel.text = "";
        textEditLabel.text = "";
      })
    );

    textEditTabLayout.addWidget(lineEditField);
    textEditTabLayout.addWidget(lineEditLabel);
    textEditTabLayout.addWidget(textEditArea);
    textEditTabLayout.addWidget(textEditLabel);
    textEditTabLayout.addWidget(clearButton);
    textEditTabLayout.addStretch(0);
    textEditTabLayout.spacing = Ui.Sizes.Padding;
    textEditTabWidget.layout = textEditTabLayout;
    stackedWidget.addWidget(textEditTabWidget);
  }
}
