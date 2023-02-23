const ResponseConstants = {
    Common: {
        200: {
            code: 'RESPONSE_SUCCESS',
            message: 'Request served successfully.'
        },
        400: {
            code: 'BAD_REQUEST',
            message: 'The request does not conform with the expected schema.'
        },
        401: {
            code: 'UNAUTHORIZED',
            message: 'This user is not authorized to perform this action.'
        },
        404: {
            code: 'NOT_FOUND',
            message: 'Could not find the requested resource.'
        },
        409: {
            code: 'CONFLICT',
            message: 'This resource already exists in the system.'
        },
        500: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Oops, Something went wrong!'
        },
    },
    Auth: {
        USER_NOT_FOUND: {
            code: 'USER_NOT_FOUND',
            message: 'This user does not exist in the system.'
        },
        USER_EXISTS_CONFLICT: {
            code: 'USER_EXISTS_CONFLICT',
            message: 'This user already exists in the system.'
        },
        GOOGLE_VERIFICATION_FAILED: {
            code: 'GOOGLE_VERIFICATION_FAILED',
            message: 'Failed to verify identity with Google.'
        },
        DOMAIN_NOT_ALLOWED: {
            code: 'DOMAIN_NOT_ALLOWED',
            message: 'The domain used to authenticate is currently not allowed by the system.'
        },
        OTP_VERIFICATION_FAILED: {
            code: 'OTP_VERIFICATION_FAILED',
            message: 'The otp used to authenticate is currently not valid.'
        }
    },
    Customer: {
        CUSTOMER_NOT_FOUND: {
            code: 'CUSTOMER_NOT_FOUND',
            message: 'Could not find the requested customer.'
        },
        INVALID_SCHEDULE_TIME: {
            code: 'INVALID_SCHEDULE_TIME',
            message: 'Conversation cannot be scheduled at a past time.'
        }
    },
    Contact: {
        DUPLICATE_CONTACT: {
            code: 'CONTACT_ALREADY_EXISTS',
            message: 'A contact with this Email ID already exists.'
        },
        DUPLICATE_LINKED_IN:{
            code: 'LINKEDIN_ID_ALREADY_EXISTS',
            message: 'A contact with this Linked In ID already exists.'
        }
    },
    Conversation: {
        CONVERSATION_NOT_FOUND: {
            code: 'CONVERSATION_NOT_FOUND',
            message: 'Could not find the requested conversation.'
        },
        CONVERSATION_ALREADY_CLOSED: {
            code: 'CONVERSATION_ALREADY_CLOSED',
            message: 'Conversation is already closed.'
        },
        INVALID_MEET_PASSCODE: {
            code: 'INVALID_MEET_PASSCODE',
            message: 'Meet Passcode is invalid.'
        },
        INVALID_PARTICIPANT_NAME: {
            code: 'INVALID_PARTICIPANT_NAME',
            message: 'Participant Name is invalid.'
        }
    },
    Organisation: {
        ORGANISATION_NOT_FOUND: {
            code: 'ORGANISATION_NOT_FOUND',
            message: 'Organisation not found'
        }
    },
    Workspace: {
        WORKSPACE_NOT_FOUND: {
            code: 'WORKSPACE_NOT_FOUND',
            message: 'Workspace for user not found.'
        }
    },
    CRM: {
        STATUS_NOT_FOUND: {
            code: 'STATUS_NOT_FOUND',
            message: 'CRM Status not found.'
        }
    },
    SCHEDULE: {
        SCHEDULE_NOT_FOUND: {
            code: 'SCHEDULE_NOT_FOUND',
            message: 'Meeting not found.'
        },
        INVALID_SCHEDULE_DELETE: {
            code: 'INVALID_SCHEDULE_DELETE',
            message: 'This event was synced from your Google Calendar. Please update it from your Google Calendar.'
        }
    }
};

export default ResponseConstants;