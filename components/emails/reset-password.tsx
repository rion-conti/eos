import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from "react-email";

interface ForgotPasswordProps {
  username: string;
  resetUrl: string;
}

export default function ForgotPasswordEmail(props: ForgotPasswordProps) {
  const { username, resetUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] p-[32px] max-w-[600px] mx-auto shadow-sm">
            <Section>
              <Text className="text-[28px] font-bold text-gray-900 mb-[8px] mt-0">
                Reset your password
              </Text>

              <Text className="text-[16px] text-gray-600 mb-[32px] mt-0">
                We received a request to reset your password
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[16px] mt-0 leading-[24px]">
                Hi {username},
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[24px] mt-0 leading-[24px]">
                Someone requested a password reset for your account. If this was
                you, click the button below to set a new password. If you
                didn&apos;t make this request, you can safely ignore this email.
              </Text>

              <Section className="text-center mb-[32px]">
                <Button
                  href={resetUrl}
                  className="bg-red-600 hover:bg-red-700 text-white px-[40px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                >
                  Reset Password
                </Button>
              </Section>

              <Section className="bg-amber-50 border-l-4 border-amber-400 p-[16px] mb-[24px] rounded-r-[4px]">
                <Text className="text-[14px] text-amber-800 m-0 leading-[20px]">
                  <strong>Security reminder:</strong> This reset link will
                  expire in 1 hour. Never share this link with anyone, and
                  always verify the sender before clicking.
                </Text>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-[16px] mt-0 leading-[20px]">
                If the button doesn&apos;t work, copy and paste this link into
                your browser:
              </Text>

              <Text className="text-[14px] text-blue-600 mb-[32px] mt-0 break-all bg-gray-50 p-[12px] rounded-[4px] border border-gray-200">
                {resetUrl}
              </Text>

              <Text className="text-[14px] text-gray-600 mb-[24px] mt-0 leading-[20px]">
                If you&apos;re having trouble accessing your account or
                didn&apos;t request this reset, please contact our support team
                immediately.
              </Text>

              <Hr className="border-gray-200 my-[32px]" />

              <Text className="text-[14px] text-gray-700 mt-0 mb-[16px] leading-[20px]">
                Best regards,
                <br />
                The Security Team
              </Text>

              <Text className="text-[12px] text-gray-400 m-0">
                456 Security Blvd, Suite 200, Tech City, TC 54321 <br />
                Need help? Contact us at support@company.com
                <br />
                <a href="#" className="text-gray-400 underline">
                  Unsubscribe
                </a>{" "}
                from security notifications
                <br />© {new Date().getFullYear()}. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
