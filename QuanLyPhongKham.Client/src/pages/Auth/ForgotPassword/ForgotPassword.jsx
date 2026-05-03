import "../auth.scss";
import "./ForgotPassword.scss";
import heroImage from "../../../assets/image/Hospital.jpg";
import logo from "../../../assets/image/LogoBYT.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  Result,
  Space,
  Steps,
  Typography,
} from "antd";
import { createChangePasswordRequest } from "../../../interfaces";
import { changePassword as changePasswordApi } from "../../../apis";

const { Title, Paragraph } = Typography;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [verifyData, setVerifyData] = useState({ email: "", phoneNumber: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [verifyForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const handleVerify = (values) => {
    setVerifyData({ email: values.email, phoneNumber: values.phoneNumber });
    setCurrentStep(1);
  };

  const handleChangePassword = async (values) => {
    setError("");
    setSubmitting(true);
    try {
      const response = await changePasswordApi(
        createChangePasswordRequest(
          verifyData.email,
          verifyData.phoneNumber,
          values.newPassword,
          values.confirmNewPassword,
        ),
      );

      const res = response?.data ?? {};
      const isSuccess = res?.isSuccess ?? res?.IsSuccess;
      const msg = res?.message ?? res?.Message;

      if (!isSuccess) {
        const isVerifyError =
          msg?.toLowerCase().includes("phone") ||
          msg?.toLowerCase().includes("not found");
        setError(msg || "Không thể đổi mật khẩu.");
        if (isVerifyError) setCurrentStep(0);
        return;
      }

      setDone(true);
    } catch (err) {
      const data = err?.response?.data;
      const validationErrors = data?.errors ?? data?.Errors;
      const firstValidationMsg = validationErrors
        ? Object.values(validationErrors).flat().find(Boolean)
        : null;
      const msg = data?.message ?? data?.Message ?? data?.title ?? data?.Title;
      setError(firstValidationMsg || msg || "Không thể đổi mật khẩu.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="auth-page forgot-password-page">
        <div className="auth-shell">
          <aside className="auth-visual">
            <div className="auth-badge">
              <img src={logo} alt="Bộ Y tế" />
              <div>
                <span className="auth-badge-title">
                  Hệ thống quản lý phòng khám
                </span>
                <span className="auth-badge-subtitle">Khôi phục mật khẩu</span>
              </div>
            </div>
            <Title level={2}>Quên mật khẩu?</Title>
            <Paragraph>
              Xác minh email và số điện thoại để đặt lại mật khẩu tài khoản của
              bạn.
            </Paragraph>
            <img
              className="auth-illustration"
              src={heroImage}
              alt="Bệnh viện"
            />
          </aside>

          <Card className="auth-card" variant="borderless">
            {done ? (
              <Result
                className="forgot-password-result"
                status="success"
                title="Đổi mật khẩu thành công!"
                subTitle="Bạn có thể đăng nhập bằng mật khẩu mới."
                extra={
                  <Button type="primary" onClick={() => navigate("/login")}>
                    Đăng nhập
                  </Button>
                }
              />
            ) : (
              <>
                <div className="auth-card-header">
                  <Title level={2}>Đặt lại mật khẩu</Title>
                  <Paragraph>
                    {currentStep === 0
                      ? "Nhập email và số điện thoại để xác minh tài khoản."
                      : "Nhập mật khẩu mới cho tài khoản của bạn."}
                  </Paragraph>
                </div>

                <Steps
                  className="forgot-password-steps"
                  current={currentStep}
                  size="small"
                  items={[{ title: "Xác minh" }, { title: "Đổi mật khẩu" }]}
                />

                {currentStep === 0 && (
                  <Form
                    form={verifyForm}
                    layout="vertical"
                    onFinish={handleVerify}
                    autoComplete="off"
                    className="auth-form"
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Nhập email" },
                        { type: "email", message: "Email không hợp lệ" },
                      ]}
                    >
                      <Input placeholder="Email đăng ký tài khoản" />
                    </Form.Item>

                    <Form.Item
                      label="Số điện thoại"
                      name="phoneNumber"
                      rules={[
                        { required: true, message: "Nhập số điện thoại" },
                        {
                          pattern: /^(0[35789])\d{8}$/,
                          message: "Số điện thoại Việt Nam không hợp lệ",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Số điện thoại đăng ký"
                        maxLength={10}
                      />
                    </Form.Item>

                    <Space className="auth-actions" wrap>
                      <Button type="primary" htmlType="submit">
                        Tiếp theo
                      </Button>
                      <Button onClick={() => navigate("/login")}>
                        Quay về đăng nhập
                      </Button>
                    </Space>
                  </Form>
                )}

                {currentStep === 1 && (
                  <Form
                    form={passwordForm}
                    layout="vertical"
                    onFinish={handleChangePassword}
                    autoComplete="off"
                    className="auth-form"
                  >
                    <Form.Item
                      label="Mật khẩu mới"
                      name="newPassword"
                      rules={[
                        { required: true, message: "Nhập mật khẩu mới" },
                        { min: 8, message: "Mật khẩu ít nhất 8 ký tự" },
                        { max: 40, message: "Mật khẩu tối đa 40 ký tự" },
                      ]}
                    >
                      <Input.Password placeholder="Mật khẩu mới" />
                    </Form.Item>

                    <Form.Item
                      label="Xác nhận mật khẩu"
                      name="confirmNewPassword"
                      dependencies={["newPassword"]}
                      rules={[
                        { required: true, message: "Xác nhận mật khẩu" },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            )
                              return Promise.resolve();
                            return Promise.reject(
                              new Error("Mật khẩu không khớp"),
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder="Nhập lại mật khẩu mới" />
                    </Form.Item>

                    {error && <Alert message={error} type="error" showIcon />}

                    <Space className="auth-actions" wrap>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={submitting}
                      >
                        Đổi mật khẩu
                      </Button>
                      <Button
                        onClick={() => {
                          setError("");
                          setCurrentStep(0);
                        }}
                        disabled={submitting}
                      >
                        Quay lại
                      </Button>
                    </Space>
                  </Form>
                )}

                <Paragraph className="auth-note">
                  Nhớ mật khẩu?{" "}
                  <Button
                    type="link"
                    className="auth-link-button"
                    onClick={() => navigate("/login")}
                  >
                    Đăng nhập ngay
                  </Button>
                </Paragraph>
              </>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
