import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Student } from "../models/student.model";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://65bb641652189914b5bbf656.mockapi.io",
  }),
  tagTypes: ["Student"],

  endpoints: (builder) => ({
    getStudents: builder.query<Student[], void>({
      query: () => "/studentCurd",
      providesTags: ["Student"],
      transformResponse: (response: Student[], meta, args: any) => {
        return response.sort((a, b) => a.StudentName.localeCompare(b.StudentName));
      },
      
    }),
    getStudent: builder.query<Student, string>({
      query: (id) => `/studentCurd/${id}`,
      providesTags: ["Student"],
    }),
    addStudent: builder.mutation<void, Student>({
      query: (student) => ({
        url: "/studentCurd",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Student"],
    }),
    deleteStudent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/studentCurd/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
    updateStudent: builder.mutation<void, Student>({
      query: ({ id, ...rest }) => ({
        url: `/studentCurd/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} = studentApi;
