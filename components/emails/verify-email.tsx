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
} from "react-email"

interface VerifyEmailProps {
  username: string
  verifyUrl: string
}

export default function VerifyEmail(props: VerifyEmailProps) {
  const { username, verifyUrl } = props

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[32px]">
            <Section>
              <Text className="mt-0 mb-[16px] text-[24px] font-bold text-gray-900">
                Verify your email address
              </Text>

              <Text className="mt-0 mb-[24px] text-[16px] leading-[24px] text-gray-700">
                Hi {username},
              </Text>

              <Text className="mt-0 mb-[24px] text-[16px] leading-[24px] text-gray-700">
                Thanks for signing up! To complete your registration and secure
                your account, please verify your email address by clicking the
                button below.
              </Text>

              <Section className="mb-[32px] text-center">
                <Button
                  href={verifyUrl}
                  className="box-border rounded-[8px] bg-blue-600 px-[32px] py-[12px] text-[16px] font-medium text-white no-underline"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="mt-0 mb-[24px] text-[14px] leading-[20px] text-gray-600">
                If the button above doesn&apos;t work, you can copy and paste
                this link into your browser:
              </Text>

              <Text className="mt-0 mb-[32px] text-[14px] break-all text-blue-600">
                {verifyUrl}
              </Text>

              <Text className="mt-0 mb-[24px] text-[14px] leading-[20px] text-gray-600">
                This verification link will expire in 24 hours for security
                reasons. If you didn&apos;t create an account, you can safely
                ignore this email.
              </Text>

              <Hr className="my-[32px] border-gray-200" />

              <Text className="mt-0 mb-[8px] text-[12px] text-gray-500">
                Best regards,
                <br />
                The Company Team
              </Text>

              <Text className="m-0 text-[12px] text-gray-400">
                123 Business St, Suite 100, City, State 12345
                <br />
                If you no longer wish to receive these emails, you can{" "}
                <a href="#" className="text-gray-400 underline">
                  unsubscribe here
                </a>
                .<br />© {new Date().getFullYear()}. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
