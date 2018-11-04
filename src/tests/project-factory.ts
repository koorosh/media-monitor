import * as faker from 'faker'
import { Project } from '../models'

export function projectFactory(isActive: boolean = false) {
  const project = new Project(faker.name.title(), [], isActive)
  return project
}
