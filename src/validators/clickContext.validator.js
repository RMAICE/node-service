import Joi from 'joi'

export function validateGetClickContext(id) {
  const schema = Joi.object({
    click_id: Joi.string().trim(true).required()
  })
  return schema.validate(id)
}
