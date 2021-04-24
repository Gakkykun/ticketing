import {Publisher, OrderCancelledEvents, Subjects} from '@gakkytickets/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvents> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}

