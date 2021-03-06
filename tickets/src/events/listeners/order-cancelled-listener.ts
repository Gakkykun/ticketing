import {Listener, OrderCancelledEvents, Subjects} from '@gakkytickets/common'
import {Message} from 'node-nats-streaming'
import { queueGroupName } from './queue-group-name'
import {Ticket} from '../../models/ticket'
import {TicketUpdatedPublisher} from '../publishers/ticket-updated-publisher'

export class OrderCancelledListener extends Listener<OrderCancelledEvents> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled

  queueGroupName = queueGroupName

  async onMessage(data: OrderCancelledEvents['data'], msg: Message){
    const ticket = await Ticket.findById(data.ticket.id)

    if(!ticket){
      throw new Error('Ticket not found')
    }
    
    ticket.set({orderId: undefined})

    await ticket.save()
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      orderId: ticket.orderId,
      userId: ticket.userId,
      title: ticket.title,
      price: ticket.price,
      version: ticket.version
    })
    
    msg.ack()
  }

}