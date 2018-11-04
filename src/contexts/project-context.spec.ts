import { assert } from 'chai'
import * as sinon from 'sinon'
import ProjectContext from './project-context'
import { projectFactory } from '../tests/project-factory'
import storage from '../core/chrome-plugin-api/storage'

describe('ProjectContext', () => {
  let p1, p2, p3

  beforeEach(() => {
    p1 = projectFactory(true)
    p2 = projectFactory()
    p3 = projectFactory()

    ProjectContext.projects = [p1, p2, p3]
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('#remeveProject', () => {
    it('should remove provided project', async () => {
      sinon.stub(storage, 'removeByKey').resolves()
      await ProjectContext.removeProject(p2)
      assert.equal(ProjectContext.projects.length, 2)
      assert.deepEqual(ProjectContext.projects, [p1, p3])
    })

    it('should remove active project and then set first available project as Active', async () => {
      sinon.stub(storage, 'setActiveStatus').resolves()
      sinon.stub(storage, 'removeByKey').resolves()
      sinon.stub(storage, 'getData').resolves({
        [p2.id]: { ...p2, isActive: true },
        [p3.id]: p3
      })

      await ProjectContext.removeProject(p1)
      assert.isTrue(ProjectContext.projects[0].isActive)
    })
  })
})
