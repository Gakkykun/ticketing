import {Message} from 'node-nats-streaming'
import mongoose from 'mongoose'
import {OrderCreatedEvent, OrderStatus} from '@gakkytickets/common'
import {OrderCreatedListener} from '../order-created-listener'
import {natsWrapper} from '../../../nats-wrapper'
import {Ticket} from '../../../models/ticket'

const setup = async () => {
  //  create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client)

  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: 'asdf'
  })

  await ticket.save()

  const data: OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'alsdf',
    expiresAt: 'asdf',
    ticket: {
        id: ticket.id,
        price: ticket.price,
    }
  }

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  return {listener, ticket, data, msg}
}

it('sets the userId of the ticket', async() => {
  const {listener, ticket, data, msg} = await setup()
  
  await listener.onMessage(data, msg)
  
  const updatedTicket = await Ticket.findById(ticket.id)
  
  expect(updatedTicket!.orderId).toEqual(data.id)
})

it('acks the message', async () => {
  const {listener, ticket, data, msg} = await setup()
  await listener.onMessage(data, msg)

  expect(msg.ack).toHaveBeenCalled()

})

it('publishes a ticket updated event', async () => {
  const {listener, ticket, data, msg} = await setup()

  await listener.onMessage(data, msg)

  expect(natsWrapper.client.publish).toHaveBeenCalled()

})
