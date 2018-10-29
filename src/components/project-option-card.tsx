import * as React from 'react'
import * as _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CardContent from '@material-ui/core/CardContent'
import { Option } from '../models'

export interface ProjectOptionCardProps {
  name: string
  options: Option[]
  onSelectedChange: (selectedOptions: Option[]) => void
  classes?: any
}

export interface ProjectOptionCardState {
  optionsState: { [key: string]: [boolean, Option]}
}

const styles = () => ({
  checkbox: {
    width: 24,
    height: 24,
    paddingTop: 2,
    paddingBottom: 2
  }
});

class ProjectOptionCard extends React.Component<ProjectOptionCardProps, ProjectOptionCardState> {
  constructor(props: ProjectOptionCardProps) {
    super(props)

    this.state = {
      optionsState: props.options.reduce((acc, option: Option) => ({
        ...acc,
        [option.id]: false
      }), {})
    }
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

  getSelectedOptions = (optionsState) => _.chain(optionsState)
    .filter((v: [boolean, Option]) => v[0])
    .map((v: [boolean, Option]) => v[1])
    .value()

  render() {
    const { name, options, classes } = this.props
    const { optionsState } = this.state

    return (
      <CardContent>
        <FormControl component="fieldset">
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
        </FormControl>
      </CardContent>
    )
  }
}

export default withStyles(styles)(ProjectOptionCard)
