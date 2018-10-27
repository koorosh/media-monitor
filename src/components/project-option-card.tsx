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
    width: 36,
    height: 36
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
    this.setState({
      optionsState: {
        ...optionsState,
        [option.id]: [!(optionsState[option.id][0]), option]
      }
    })
    const selectedOptions: Option[] = this.getSelectedOptions()
    this.props.onSelectedChange(selectedOptions)
  }

  getSelectedOptions = () => _.chain(this.state.optionsState)
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
