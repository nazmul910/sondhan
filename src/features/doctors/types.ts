// API response types matching https://dashboard.shondan.org/api/v1

export interface ApiDoctorCategory {
  id: number;
  name: string;
}

export interface ApiDoctorListItem {
  id: number;
  name: string;
  qualifications: string;
  specialization: string;
  experience: string;
  away: string | null;
  image_url: string | null;
  category: ApiDoctorCategory;
}

export interface ApiDoctorHospital {
  id: number;
  hospital_name: string;
  clinic_name: string;
  address: string;
  image_url: string | null;
  available_time: string[];
}

export interface ApiDoctorDetail {
  id: number;
  name: string;
  image_url: string | null;
  qualifications: string;
  specialization: string;
  patients_count: string;
  experience: string;
  rating: string;
  biography: string;
  phone: string | null;
  is_wishlisted: boolean;
  hospitals: ApiDoctorHospital[];
}

export interface DoctorsListResponse {
  success: boolean;
  message: string;
  data: ApiDoctorListItem[];
}

export interface DoctorDetailResponse {
  success: boolean;
  message: string;
  data: {
    doctor: ApiDoctorDetail;
  };
}

export interface WishlistToggleResponse {
  success: boolean;
  message: string;
  data: {
    is_wishlisted: boolean;
  };
}

export interface DoctorsState {
  items: ApiDoctorListItem[];
  wishlistItems: ApiDoctorListItem[];
  selectedDoctor: ApiDoctorDetail | null;
  loading: boolean;
  detailLoading: boolean;
  wishlistLoading: boolean;
  error: string | null;
  detailError: string | null;
  rateLoading: boolean;
  rateSuccess: string | null;
  rateError: string | null;
}
