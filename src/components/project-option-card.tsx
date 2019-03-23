import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CardContent from '@material-ui/core/CardContent'
import Input from '@material-ui/core/Input'
import { Option } from '../models'

export interface ProjectOptionCardProps {
  name: string
  options: Option[]
  onSelectedChange: (selectedOptions: Option[]) => void
  classes?: any
}

export interface ProjectOptionCardState {
  optionsState: { [key: string]: [boolean, Option]},
  customOption: Option
}

const styles = () => ({
  checkbox: {
    width: 24,
    height: 24,
    paddingTop: 2,
    paddingBottom: 2
  },
  textField: {
    input: {
      margin: 0,
    }
  },
  formControl: {
    width: '100%'
  }
});

class ProjectOptionCard extends React.Component<ProjectOptionCardProps, ProjectOptionCardState> {
  constructor(props: ProjectOptionCardProps) {
    super(props)

    this.state = {
      optionsState: this.initOptionsState(props.options),
      customOption: {
        id: 'custom_option',
        name: ''
      }
    }
  }

  componentWillReceiveProps(nextProps: ProjectOptionCardProps) {
    if (nextProps.options !== this.props.options) {
      this.setState({
        optionsState: this.initOptionsState(nextProps.options)
      })
    }
  }

  initOptionsState(options: Option[]) {
    return options.reduce((acc, option: Option) => ({
      ...acc,
      [option.id]: [false, option]
    }), {})
  }

  handleChange = (option: Option) => {
    const { optionsState } = this.state
    const newOptionState: any = {
      ...optionsState,
      [option.id]: [!(optionsState[option.id][0]), option]
    }
    this.setState({
      optionsState: newOptionState
    })
    const selectedOptions: Option[] = this.getSelectedOptions(newOptionState)
    this.props.onSelectedChange(selectedOptions)
  }

  handleCustomOptionChange = (event: any) => {
    const name = event.target.value
    const { optionsState, customOption } = this.state
    const updatedOption = {
      ...customOption,
      name
    }

    const newOptionState: any = {
      ...optionsState,
      [customOption.id]: [(name !== ''), updatedOption]
    }

    this.setState({
      customOption: updatedOption
    })

    const selectedOptions: Option[] = this.getSelectedOptions(newOptionState)
    this.props.onSelectedChange(selectedOptions)
  }

  getSelectedOptions = (optionsState) => {
    return Object.entries(optionsState)
      .filter(([key, [isSelected, option]]: [string, [boolean, Option]]) => isSelected)
      .map(([key, [isSelected, option]]: [string, [boolean, Option]]) => option)
  }

  render() {
    const { name, options, classes } = this.props
    const { optionsState, customOption } = this.state

    return (
      <CardContent>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{name}</FormLabel>
          {
            React.Children.toArray(
              options.map((option: Option) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.checkbox}
                      checked={optionsState[option.id][0]}
                      onChange={() => this.handleChange(option)}
                      value={option.name}
                    />
                  }
                  label={option.name}
                />
              ))
            )
          }
          <Input
            style={{marginTop: '0px'}}
            key='custom_option'
            classes={{
              input: classes.textField.input
            }}
            onChange={this.handleCustomOptionChange}
            value={customOption.name}
            fullWidth
            placeholder="Інший варіант"
            margin="dense"
            inputProps={{
              'aria-label': 'Інший варіант',
            }}
          />
        </FormControl>
      </CardContent>
    )
  }
}

export default withStyles(styles)(ProjectOptionCard)
