import TicketDetail from '@/app/ticket/components/ticketDetail'

import { ticketMock } from '../../mock/ticketMock'

export default function Page() {
  return (
    <>
      <TicketDetail ticket={ticketMock} />
    </>
  )
}
