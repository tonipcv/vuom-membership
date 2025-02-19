'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import ProfileHeader from '../../components/ProfileHeader';
import StatCard from '../../components/StatCard';
import ActivityFeed from '../../components/ActivityFeed';
import { useSession } from "next-auth/react";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  birth_date: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const router = useRouter();
  const { theme } = useTheme();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user) {
        const response = await fetch('/api/profile');
        const data = await response.json();
        
        if (response.ok) {
          setProfile(data);
          setEditedProfile(data);
        } else {
          console.error('Error fetching profile:', data);
        }
      } else {
        router.push('/login');
      }
    };

    fetchProfile();
  }, [session, router]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleSave = async () => {
    if (editedProfile) {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProfile),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setIsEditing(false);
      } else {
        console.error('Error updating profile:', response.statusText);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        [e.target.name]: e.target.value,
      });
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <ProfileHeader name={profile.full_name} email={profile.email} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Informações Pessoais</h2>
                {!isEditing ? (
                  <button onClick={handleEdit} className="text-blue-500 hover:text-blue-600">
                    <FiEdit2 size={20} />
                  </button>
                ) : (
                  <div>
                    <button onClick={handleSave} className="text-green-500 hover:text-green-600 mr-2">
                      <FiSave size={20} />
                    </button>
                    <button onClick={handleCancel} className="text-red-500 hover:text-red-600">
                      <FiX size={20} />
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <ProfileField
                  icon={<FiUser />}
                  label="Nome Completo"
                  value={editedProfile?.full_name || ''}
                  isEditing={isEditing}
                  name="full_name"
                  onChange={handleChange}
                />
                <ProfileField
                  icon={<FiMail />}
                  label="Email"
                  value={editedProfile?.email || ''}
                  isEditing={isEditing}
                  name="email"
                  onChange={handleChange}
                />
                <ProfileField
                  icon={<FiPhone />}
                  label="Telefone"
                  value={editedProfile?.phone || ''}
                  isEditing={isEditing}
                  name="phone"
                  onChange={handleChange}
                />
                <ProfileField
                  icon={<FiCalendar />}
                  label="Data de Nascimento"
                  value={editedProfile?.birth_date || ''}
                  isEditing={isEditing}
                  name="birth_date"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Sinais Seguidos" value="42" />
              <StatCard title="Taxa de Acerto" value="78%" />
              <StatCard title="Lucro Total" value="R$ 1.250" />
              <StatCard title="Dias Ativos" value="30" />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <ActivityFeed />
        </div>
      </main>
    </div>
  );
}

interface ProfileFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isEditing: boolean;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ProfileField({ icon, label, value, isEditing, name, onChange }: ProfileFieldProps) {
  return (
    <div className="flex items-center">
      <div className="text-gray-400 mr-3">{icon}</div>
      <div className="flex-grow">
        <p className="text-sm text-gray-500">{label}</p>
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
          />
        ) : (
          <p>{value}</p>
        )}
      </div>
    </div>
  );
}
