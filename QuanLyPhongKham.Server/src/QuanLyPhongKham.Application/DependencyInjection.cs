using Microsoft.Extensions.DependencyInjection;
using QuanLyPhongKham.Application.Implementations.Doctors;
using QuanLyPhongKham.Application.Implementations.Patients;
using QuanLyPhongKham.Application.Implementations.MedicalServices;
using QuanLyPhongKham.Application.Implementations.Medicines;
using QuanLyPhongKham.Application.Implementations.Prescriptions;
using QuanLyPhongKham.Application.Implementations.Invoices;
using QuanLyPhongKham.Application.Implementations.Appointments;
using QuanLyPhongKham.Application.Implementations.WorkSchedules;
using QuanLyPhongKham.Application.Implementations.Staffs;
using QuanLyPhongKham.Application.Implementations.MedicalExaminations;
using QuanLyPhongKham.Application.Interfaces.Doctors;
using QuanLyPhongKham.Application.Interfaces.Patients;
using QuanLyPhongKham.Application.Interfaces.MedicalServices;
using QuanLyPhongKham.Application.Interfaces.Medicines;
using QuanLyPhongKham.Application.Interfaces.Prescriptions;
using QuanLyPhongKham.Application.Interfaces.Invoices;
using QuanLyPhongKham.Application.Interfaces.Appointments;
using QuanLyPhongKham.Application.Interfaces.WorkSchedules;
using QuanLyPhongKham.Application.Interfaces.Staffs;
using QuanLyPhongKham.Application.Interfaces.MedicalExaminations;

namespace QuanLyPhongKham.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<ICreateDoctorHandler, CreateDoctorHandler>();
            services.AddScoped<IUpdateDoctorHandler, UpdateDoctorHandler>();
            services.AddScoped<IDeleteDoctorHandler, DeleteDoctorHandler>();
            services.AddScoped<IGetDoctorByIdHandler, GetDoctorByIdHandler>();
            services.AddScoped<ISearchDoctorHandler, SearchDoctorHandler>();

            services.AddScoped<ICreatePatientHandler, CreatePatientHandler>();
            services.AddScoped<IUpdatePatientHandler, UpdatePatientHandler>();
            services.AddScoped<IDeletePatientHandler, DeletePatientHandler>();
            services.AddScoped<IGetPatientByIdHandler, GetPatientByIdHandler>();
            services.AddScoped<ISearchPatientHandler, SearchPatientHandler>();

            services.AddScoped<ICreateMedicalServiceHandler, CreateMedicalServiceHandler>();
            services.AddScoped<IUpdateMedicalServiceHandler, UpdateMedicalServiceHandler>();
            services.AddScoped<IDeleteMedicalServiceHandler, DeleteMedicalServiceHandler>();
            services.AddScoped<IGetMedicalServiceByIdHandler, GetMedicalServiceByIdHandler>();
            services.AddScoped<ISearchMedicalServiceHandler, SearchMedicalServiceHandler>();

            services.AddScoped<ICreateMedicineHandler, CreateMedicineHandler>();
            services.AddScoped<IUpdateMedicineHandler, UpdateMedicineHandler>();
            services.AddScoped<IDeleteMedicineHandler, DeleteMedicineHandler>();
            services.AddScoped<IGetMedicineByIdHandler, GetMedicineByIdHandler>();
            services.AddScoped<ISearchMedicineHandler, SearchMedicineHandler>();

            services.AddScoped<ICreatePrescriptionHandler, CreatePrescriptionHandler>();
            services.AddScoped<IUpdatePrescriptionHandler, UpdatePrescriptionHandler>();
            services.AddScoped<IDeletePrescriptionHandler, DeletePrescriptionHandler>();
            services.AddScoped<IGetPrescriptionByIdHandler, GetPrescriptionByIdHandler>();
            services.AddScoped<ISearchPrescriptionHandler, SearchPrescriptionHandler>();

            services.AddScoped<ICreateInvoiceHandler, CreateInvoiceHandler>();
            services.AddScoped<IUpdateInvoiceHandler, UpdateInvoiceHandler>();
            services.AddScoped<IDeleteInvoiceHandler, DeleteInvoiceHandler>();
            services.AddScoped<IGetInvoiceByIdHandler, GetInvoiceByIdHandler>();
            services.AddScoped<ISearchInvoiceHandler, SearchInvoiceHandler>();

            services.AddScoped<ICreateAppointmentHandler, CreateAppointmentHandler>();
            services.AddScoped<IUpdateAppointmentHandler, UpdateAppointmentHandler>();
            services.AddScoped<IDeleteAppointmentHandler, DeleteAppointmentHandler>();
            services.AddScoped<IGetAppointmentByIdHandler, GetAppointmentByIdHandler>();
            services.AddScoped<ISearchAppointmentHandler, SearchAppointmentHandler>();

            services.AddScoped<ICreateWorkScheduleHandler, CreateWorkScheduleHandler>();
            services.AddScoped<IUpdateWorkScheduleHandler, UpdateWorkScheduleHandler>();
            services.AddScoped<IDeleteWorkScheduleHandler, DeleteWorkScheduleHandler>();
            services.AddScoped<IGetWorkScheduleByIdHandler, GetWorkScheduleByIdHandler>();
            services.AddScoped<ISearchWorkScheduleHandler, SearchWorkScheduleHandler>();

            services.AddScoped<ICreateStaffHandler, CreateStaffHandler>();
            services.AddScoped<IUpdateStaffHandler, UpdateStaffHandler>();
            services.AddScoped<IDeleteStaffHandler, DeleteStaffHandler>();
            services.AddScoped<IGetStaffByIdHandler, GetStaffByIdHandler>();
            services.AddScoped<ISearchStaffHandler, SearchStaffHandler>();

            services.AddScoped<ICreateMedicalExaminationHandler, CreateMedicalExaminationHandler>();
            services.AddScoped<IUpdateMedicalExaminationHandler, UpdateMedicalExaminationHandler>();
            services.AddScoped<IDeleteMedicalExaminationHandler, DeleteMedicalExaminationHandler>();
            services.AddScoped<IGetMedicalExaminationByIdHandler, GetMedicalExaminationByIdHandler>();
            services.AddScoped<ISearchMedicalExaminationHandler, SearchMedicalExaminationHandler>();

            return services;
        }
    }
}
