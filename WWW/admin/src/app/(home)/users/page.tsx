'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import { Search, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UsersTable } from '@/components/tables/users-table'
import { UserType } from '@/types'
import { toast } from 'sonner'
import withAdminAuthRequired from '@/HOC/admin-hoc'
import { getAllPaginatedUsers, searchUser } from '@/apis/user'

function Page() {
    const [users, setUsers] = useState<UserType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const [searchType, setSearchType] = useState<'name' | 'id'>('name')

    const handlePageChange = (type: 'next' | 'back') => {
        if (type === 'next') {
            if (page === totalPages) return
            setPage(page + 1)
        } else {
            if (page === 1) return
            setPage(page - 1)
        }
    }

    async function handleSearch(type: 'clear' | 'search') {
        if (type === 'clear') {
            setSearch('')
            fetchAccounts()
            return
        }

        if (search.length < 1) {
            return toast.error('Please enter a search query')
        }

        setIsLoading(true)
        let response = await searchUser(searchType, search)
        setIsLoading(false)

        if (!response) return
        setUsers([response.data])

        setTotalPages(1)
        setPage(1)
    }

    async function fetchAccounts() {
        setIsLoading(true)
        let result = await getAllPaginatedUsers({ page, limit: 8 })
        setIsLoading(false)

        if (!result) return

        setUsers(result.data.users)
        setTotalPages(Math.ceil(result.data.totalUsers / 8))
    }

    useEffect(() => {
       fetchAccounts()
    }, [page])
    return (
        <div className='flex-1 px-4 py-12 md:px-6 md:py-4 lg:px-28 lg:pt-10'>
            <div className='border bg-white p-6'>
                <div className='flex w-full flex-col'>
                    <p className=''>Manage users in the system</p>
                </div>

                <div className='mt-4 flex items-center gap-2'>
                    <div className='relative w-full'>
                        <Input
                            value={search}
                            className='bg-slate-50 text-primary focus-visible:ring-gray-200'
                            onChange={(e) => setSearch(e.target.value)}
                            type={searchType === 'name' ? 'name' : 'text'}
                            placeholder={
                                searchType === 'name'
                                    ? 'Search by name or email ...'
                                    : 'Search by id ...'
                            }
                        />
                        <XCircle
                            size={17}
                            className={cn(
                                'absolute right-2 top-3 cursor-pointer bg-white text-muted-foreground hover:opacity-80 active:opacity-60',
                                { hidden: search.length < 1 }
                            )}
                            onClick={() => handleSearch('clear')}
                        />
                    </div>
                </div>

                <RadioGroup
                    defaultValue='name'
                    className='mt-4 flex'
                    onValueChange={(value: 'name' | 'id') =>
                        setSearchType(value)
                    }
                >
                    <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='email' id='option-one' />
                        <Label
                            htmlFor='option-one'
                            className='text-sm text-muted-foreground'
                        >
                            Search
                        </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='id' id='option-two' />
                        <Label
                            htmlFor='option-two'
                            className='text-sm text-muted-foreground'
                        >
                            Id Search
                        </Label>
                    </div>
                </RadioGroup>

                <Button
                    className='mt-4 gap-2'
                    onClick={() => handleSearch('search')}
                >
                    <Search size={17} />
                    <span>Search user</span>
                </Button>
            </div>

            <div className='mt-8 w-[350px] overflow-x-auto bg-white border md:w-full'>
                <UsersTable
                    isLoading={isLoading}
                    users={users}
                    refreshUsers={fetchAccounts}
                />

                <div className='border-t bg-white py-2.5'>
                    <Pagination>
                        <PaginationContent className='p-1'>
                            <PaginationItem>
                                <PaginationPrevious
                                    className='cursor-pointer'
                                    onClick={() => handlePageChange('back')}
                                />
                            </PaginationItem>
                            <PaginationItem>{page}</PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>{totalPages || 0}</PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    className='cursor-pointer'
                                    onClick={() => handlePageChange('next')}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}

//export default withAdminAuthRequired(Page)
export default Page
