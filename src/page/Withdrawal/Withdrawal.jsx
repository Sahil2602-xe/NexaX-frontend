import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDispatch, useSelector } from 'react-redux'
import { getWithdrawalHistory } from '@/state/Withdrawal/Action'

// Utility function to format timestamp to readable form
const formatDate = (dateString) => {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export const Withdrawal = () => {
  const dispatch = useDispatch()
  const { withdrawal } = useSelector((store) => store)

  useEffect(() => {
    dispatch(getWithdrawalHistory(localStorage.getItem('jwt')))
  }, [dispatch])

  const history = withdrawal?.history || []

  return (
    <div className="p-5 lg:px-20 text-gray-200">
      <h1 className="font-bold text-3xl pb-6 text-white">Withdrawal History</h1>

      <div className="rounded-2xl border border-gray-800 bg-[#0f1115]/80 shadow-lg backdrop-blur-sm overflow-hidden">
        {history.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-800 text-gray-400">
                <TableHead className="py-4 text-left">Date</TableHead>
                <TableHead className="text-left">Method</TableHead>
                <TableHead className="text-left">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {history.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-[#1a1d23]/60 border-b border-gray-800 transition-all"
                >
                  <TableCell className="py-4 text-gray-300">
                    {formatDate(item.date)}
                  </TableCell>
                  <TableCell className="text-gray-300">Bank Transfer</TableCell>
                  <TableCell className="text-gray-200 font-medium">
                    ${item.amount?.toFixed(2) || '0.00'}
                  </TableCell>
                  <TableCell
                    className={`text-center font-semibold ${
                      item.status === 'SUCCESS'
                        ? 'text-emerald-400'
                        : item.status === 'PENDING'
                        ? 'text-yellow-400'
                        : 'text-rose-500'
                    }`}
                  >
                    {item.status || '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-16 text-gray-500 italic">
            No withdrawal history found.
          </div>
        )}
      </div>
    </div>
  )
}

export default Withdrawal
