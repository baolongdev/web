'use client'; // Chỉ cần nếu bạn dùng App Router

import { useRouter } from 'next/router'; // hoặc 'next/navigation' nếu dùng App Router
import { CaretLeft } from 'phosphor-react';
import Button from './Button';

interface BackButtonProps {
    onClick?: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
    const router = useRouter();

    return (
        <Button
            variant='secondary'
            label={<div className='flex items-center gap-2'>
                <CaretLeft size={24} />
                Quay lại
            </div>}
            onClick={onClick
                ? onClick
                : () => {
                    router.back(); // Quay lại trang trước đó
                }}

        />
    );
}
