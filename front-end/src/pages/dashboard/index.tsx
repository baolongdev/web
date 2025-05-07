/* eslint-disable @typescript-eslint/no-unused-vars */
import PersonalInfo from '@components/Dashboard/PersonalInfo';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Button from '@components/UI/Button';
import BackButton from '@components/UI/BackButton';

export default function AdminDashboard() {
    const [selectedTab, setSelectedTab] = useState<'users' | 'edit' | 'history' | 'profile'>('profile');
    const [role, setRole] = useState<string | undefined>();
    const [cookies] = useCookies(['role']);
    const router = useRouter();

    useEffect(() => {
        setRole(cookies.role); // Lấy role từ cookie
    }, [cookies]);

    const renderContent = () => {
        switch (selectedTab) {
            case 'users':
                return <div>đoạn này thêm button xóa thông tin</div>;
            case 'edit':
                return <p>Trang chỉnh sửa nội dung hệ thống.</p>;
            case 'history':
                return <p>Lịch sử bài làm của người dùng.</p>;
            case 'profile':
                return <p>leducnhan</p>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Button label="Trang chủ" variant='secondary' onClick={() => router.push("./")} />

            <p className="text-3xl font-bold mb-6 text-gray-800 text-center uppercase">
                setting
            </p>

            <div className="w-[60vw] space-y-4 flex flex-col mx-auto">
                <Button label="Thông tin cá nhân" onClick={() => alert('Coming soon')} />

                <Button label="Làm khảo sát" variant="pink" onClick={
                    () => {
                        localStorage.removeItem('pendingAnswers');
                        router.push('/survey')
                    }
                }
                />




                {/* Chỉ admin mới thấy nút chỉnh sửa */}
                {role === 'admin' && (
                    <Button
                        label="Chỉnh sửa"
                        variant="secondary"
                        onClick={() => router.push('/dashboard/edit')}
                    />
                )}

                <Button
                    label="Lịch sử bài làm"
                    variant="secondary"
                    onClick={() => router.push('/survey/history')}
                />

                {/* Chỉ admin mới thấy nút xóa thông tin */}
                {role === 'admin' && (
                    <Button
                        label="Xóa thông tin người dùng"
                        variant="danger"
                        onClick={() => router.push('/dashboard/delete-info')}
                    />
                )}

                <Button
                    label="Đăng xuất"
                    variant="danger"
                    onClick={() => router.push('/authentication/logout')}
                />
            </div>
        </div>
    );
}
