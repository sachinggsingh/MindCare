import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../redux/auth/profileSlice';
import { User, Mail, Phone, Calendar, Users, X, Check, Edit3 } from 'lucide-react';

export default function Profile() {
    const { user, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        age: user?.age || '',
        gender: user?.gender || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateUserProfile(formData)).unwrap();
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="w-20 h-20 relative">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute top-2 left-2 w-16 h-16 border-4 border-indigo-600 border-b-transparent rounded-full animate-spin-slow"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm bg-opacity-90 border border-gray-100">
                <div className="relative">
                    <div className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 h-32 md:h-20"></div>
                    <div className="absolute bottom-0 transform translate-y-1/2 left-8 bg-white rounded-full p-1 shadow-lg">
                        <div className="bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center overflow-hidden">
                            <User size={48} className="text-gray-500" />
                        </div>
                    </div>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="absolute right-6 top-6 bg-white text-indigo-600 p-3 rounded-full shadow-md hover:shadow-lg transition duration-300 group"
                        >
                            <Edit3 size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                        </button>
                    )}
                </div>

                <div className="mt-16 px-8 pb-8">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="font-medium text-gray-700 flex items-center text-sm uppercase tracking-wider mb-2">
                                            <User size={16} className="text-indigo-500 mr-2" />
                                            Name
                                        </label>
                                        <div className={`relative overflow-hidden rounded-xl transition-all duration-300 ${isEditing ? 'ring-2 ring-indigo-500 shadow-md' : 'bg-gray-50'}`}>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="w-full p-4 focus:outline-none bg-transparent"
                                                placeholder="Your name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="font-medium text-gray-700 flex items-center text-sm uppercase tracking-wider mb-2">
                                            <Mail size={16} className="text-indigo-500 mr-2" />
                                            Email
                                        </label>
                                        <div className={`relative overflow-hidden rounded-xl transition-all duration-300 ${isEditing ? 'ring-2 ring-indigo-500 shadow-md' : 'bg-gray-50'}`}>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="w-full p-4 focus:outline-none bg-transparent"
                                                placeholder="Your email"
                                            />
                                        </div>
                                    </div>

                                    {/* <div>
                                        <label className="font-medium text-gray-700 flex items-center text-sm uppercase tracking-wider mb-2">
                                            <Phone size={16} className="text-indigo-500 mr-2" />
                                            Phone
                                        </label>
                                        <div className={`relative overflow-hidden rounded-xl transition-all duration-300 ${isEditing ? 'ring-2 ring-indigo-500 shadow-md' : 'bg-gray-50'}`}>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="w-full p-4 focus:outline-none bg-transparent"
                                                placeholder="Your phone number"
                                            />
                                        </div>
                                    </div> */}
                                </div>

                                <div className="space-y-6">
                                    {/* <div>
                                        <label className="font-medium text-gray-700 flex items-center text-sm uppercase tracking-wider mb-2">
                                            <Calendar size={16} className="text-indigo-500 mr-2" />
                                            Age
                                        </label>
                                        <div className={`relative overflow-hidden rounded-xl transition-all duration-300 ${isEditing ? 'ring-2 ring-indigo-500 shadow-md' : 'bg-gray-50'}`}>
                                            <input
                                                type="number"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="w-full p-4 focus:outline-none bg-transparent"
                                                placeholder="Your age"
                                            />
                                        </div>
                                    </div> */}

                                    {/* <div>
                                        <label className="font-medium text-gray-700 flex items-center text-sm uppercase tracking-wider mb-2">
                                            <Users size={16} className="text-indigo-500 mr-2" />
                                            Gender
                                        </label>
                                        <div className={`relative overflow-hidden rounded-xl transition-all duration-300 ${isEditing ? 'ring-2 ring-indigo-500 shadow-md' : 'bg-gray-50'}`}>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="w-full p-4 focus:outline-none bg-transparent appearance-none"
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                <div className={`w-2 h-2 border-r-2 border-b-2 transform rotate-45 ${isEditing ? 'border-indigo-500' : 'border-gray-400'}`}></div>
                                            </div>
                                        </div>
                                    </div> */}

                                    {isEditing && (
                                        <div className="pt-4">
                                            <div className="flex space-x-4 justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditing(false)}
                                                    className="flex items-center justify-center p-3 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition duration-300"
                                                >
                                                    <X size={20} className="mr-2" />
                                                    <span>Cancel</span>
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:shadow-lg transition duration-300"
                                                >
                                                    <Check size={20} className="mr-2" />
                                                    <span>Save Changes</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-6 mt-8">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Last updated: Today</span>
                                    <span>Profile ID: {user?.id || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}