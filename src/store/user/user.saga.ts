import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { User } from 'firebase/auth';

import {
    signInSuccess,
    signInFailed,
    signUpSuccess,
    signUpFailed,
    signOutSuccess,
    signOutFailed,
} from './user.reducer';

import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    AdditionalInformation
} from '../../utils';

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        );
        if (userSnapshot) {
            yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithEmail({
    payload: { email, password },
}: {
    type: 'user/signInWithEmail';
    payload: {
        email: string;
        password: string;
    };
}) {
    try {
        const userCredential = yield* call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );

        if (userCredential) {
            const { user } = userCredential;
            yield* call(getSnapshotFromUserAuth, user);
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

type SignInAfterSignUpPayload = {
    user: User;
    additionalDetails: AdditionalInformation;
};

export function* signUp({
    payload: { email, password, displayName },
}: {
    type: 'user/signStart';
    payload: {
        email: string;
        password: string;
        displayName: string;
    };
}) {
    try {
        const userCredential = yield* call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        );

        if (userCredential) {
            const { user } = userCredential;
            yield* put(signUpSuccess({ user, additionalDetails: { displayName } } as SignInAfterSignUpPayload));
        }

    } catch (error) {
        yield* put(signUpFailed(error as Error));
    }
}

export function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch (error) {
        yield* put(signOutFailed(error as Error));
    }
}

export function* signInAfterSignUp({
    payload: { user, additionalDetails },
}: {
    type: 'user/signUpSuccess';
    payload: {
        user: User;
        additionalDetails: AdditionalInformation;
    };
}) {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
    yield* takeLatest('user/googleSignInStart', signInWithGoogle);
}

export function* onCheckUserSession() {
    yield* takeLatest('user/checkUserSession', isUserAuthenticated);
}

export function* onEmailSignInStart() {
    yield* takeLatest('user/emailSignInStart', signInWithEmail);
}

export function* onSignUpStart() {
    yield* takeLatest('user/signUpStart', signUp);
}


export function* onSignUpSuccess() {
    yield* takeLatest('user/signUpSuccess', signInAfterSignUp);
}

export function* onSignOutStart() {
    yield* takeLatest('user/signOutStart', signOut);
}

export function* userSagas() {
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}