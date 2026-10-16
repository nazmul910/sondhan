// API response types for hospitals — https://dashboard.shondan.org/api/v1

export interface ApiHospitalListItem {
  id: number;
  name: string;
  address: string;
  phone: string | null;
  away: string | null;
  image: string | null;
  has_antivenom: boolean;
}

export interface ApiHospitalDoctorItem {
  id: number;
  name: string;
  image_url: string | null;
  qualifications: string;
  specialization: string;
  experience: string;
  rating: string;
  clinic_name: string;
  available_time: string;
}

export interface ApiHospitalDetail {
  id: number;
  name: string;
  address: string;
  phone: string | null;
  away: string | null;
  image: string | null;
  has_antivenom: boolean;
  status: string;
  doctors: {
    daily: ApiHospitalDoctorItem[];
    friday: ApiHospitalDoctorItem[];
    specialist: ApiHospitalDoctorItem[];
  };
}

export interface ApiPagination {
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
  from: number;
  to: number;
}

export interface HospitalsListResponse {
  status: boolean;
  message: string;
  code: number;
  data: ApiHospitalListItem[];
  pagination: ApiPagination;
}

export interface HospitalDetailResponse {
  success: boolean;
  data: ApiHospitalDetail;
}

export interface HospitalsState {
  items: ApiHospitalListItem[];
  selectedHospital: ApiHospitalDetail | null;
  pagination: ApiPagination | null;
  loading: boolean;
  detailLoading: boolean;
  error: string | null;
  detailError: string | null;
}
