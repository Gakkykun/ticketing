import {Publisher, OrderCreatedEvent, Subjects} from '@gakkytickets/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated
}

