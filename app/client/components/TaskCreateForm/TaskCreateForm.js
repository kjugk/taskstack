'use strict';
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result['default'] = mod;
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const React = __importStar(require('react'));
const semantic_ui_react_1 = require('semantic-ui-react');
const styled_components_1 = __importDefault(require('styled-components'));
const Container = styled_components_1.default.div`
  margin-bottom: 1rem;
`;
class TaskCreateForm extends React.Component {
  componentDidUpdate(prevProps) {
    const { formState } = this.props;
    // 連続入力をやりやすくするために、submit 後に focus させている。
    if (prevProps.formState.isSubmitting && !formState.isSubmitting) {
      this.input.focus();
    }
  }
  render() {
    const { formState, onTitleChange } = this.props;
    return React.createElement(
      Container,
      null,
      React.createElement(
        'form',
        { onSubmit: (e) => this.props.onSubmit(e) },
        React.createElement(semantic_ui_react_1.Input, {
          disabled: formState.isSubmitting,
          fluid: true,
          icon:
            formState.isSubmitting &&
            React.createElement(semantic_ui_react_1.Icon, { loading: true, name: 'spinner' }),
          onChange: (e) => onTitleChange(e),
          placeholder: '\u30BF\u30B9\u30AF\u3092\u4F5C\u6210',
          value: formState.title,
          ref: (ref) => (this.input = ref)
        })
      )
    );
  }
}
exports.TaskCreateForm = TaskCreateForm;
