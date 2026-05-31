import type {
  ParticipantData,
  SourceTournamentSnapshotData,
  TournamentData,
  TournamentStatusAuditData,
} from '@repo/domain';

import type {
  PadlhubTournament,
  PadlhubTournamentParticipant,
  PadlhubSourceTournamentSnapshot,
} from './@generated';

function splitFullName(name: string): Pick<ParticipantData, 'firstName' | 'lastName'> {
  const trimmed = name.trim();
  const spaceIndex = trimmed.indexOf(' ');

  if (spaceIndex === -1) {
    return { firstName: trimmed, lastName: '' };
  }

  return {
    firstName: trimmed.slice(0, spaceIndex),
    lastName: trimmed.slice(spaceIndex + 1).trim(),
  };
}

function mapParticipant(
  participant: PadlhubTournamentParticipant,
): ParticipantData {
  const { firstName, lastName } = splitFullName(participant.name);
  const photo =
    participant.avatarUrl ?? participant.avatar ?? participant.photo ?? undefined;

  return {
    id: participant.id,
    firstName,
    lastName,
    ...(photo ? { photo } : {}),
  };
}

function createDefaultStatusAudit(
  status: TournamentData['status'],
  at: string,
): TournamentStatusAuditData {
  return {
    lastChange: {
      at,
      toStatus: status,
      reason: '',
      actor: {
        id: 'padlhub',
        name: 'Padlhub',
      },
    },
    history: [],
  };
}

function mapSnapshot(
  snapshot?: PadlhubSourceTournamentSnapshot,
): SourceTournamentSnapshotData | undefined {
  if (!snapshot?.id) {
    return undefined;
  }

  return {
    id: snapshot.id,
    source: snapshot.source ?? '',
    name: snapshot.name ?? '',
    status: snapshot.status ?? '',
    startsAt: snapshot.startsAt ?? '',
    endsAt: snapshot.endsAt ?? '',
    studioId: snapshot.studioId ?? '',
    studioName: snapshot.studioName ?? '',
    courtName: snapshot.courtName ?? '',
    locationName: snapshot.locationName ?? '',
    trainerId: snapshot.trainerId ?? '',
    trainerName: snapshot.trainerName ?? '',
    trainerAvatarUrl: snapshot.trainerAvatarUrl ?? '',
    exerciseTypeId: snapshot.exerciseTypeId ?? '',
    tournamentType: snapshot.tournamentType ?? '',
    maxPlayers: snapshot.maxPlayers ?? 0,
    participantsCount: snapshot.participantsCount ?? 0,
  };
}

export function mapPadlhubTournament(
  tournament: PadlhubTournament,
): TournamentData {
  const status = tournament.status as TournamentData['status'];
  const statusAudit = createDefaultStatusAudit(status, tournament.startsAt);
  const source: TournamentData['source'] =
    tournament.source === 'VIVA' ? 'VIVA' : 'CUSTOM';

  return {
    id: tournament.id,
    source,
    name: tournament.name,
    status,
    rawStatus: tournament.rawStatus,
    slug: tournament.slug,
    publicUrl: tournament.publicUrl,
    sourceTournamentId: tournament.sourceTournamentId,
    linkedCustomTournamentId: tournament.linkedCustomTournamentId,
    tournamentType: tournament.tournamentType,
    isPublic: tournament.isPublic,
    accessLevels: tournament.accessLevels,
    gender: tournament.gender,
    maxPlayers: tournament.maxPlayers,
    participants: tournament.participants.map(mapParticipant),
    waitlist: tournament.waitlist.map(mapParticipant),
    participantsCount: tournament.participantsCount,
    paidParticipantsCount: tournament.paidParticipantsCount,
    waitlistCount: tournament.waitlistCount,
    allowedManagerPhones: tournament.allowedManagerPhones,
    publicationCommunityIds: tournament.publicationCommunityIds,
    studioId: tournament.studioId,
    studioName: tournament.studioName,
    courtName: tournament.courtName,
    locationName: tournament.locationName,
    trainerId: tournament.trainerId,
    trainerName: tournament.trainerName,
    trainerAvatarUrl: tournament.trainerAvatarUrl ?? '',
    exerciseTypeId: tournament.exerciseTypeId,
    startsAt: tournament.startsAt,
    endsAt: tournament.endsAt,
    createdAt: tournament.startsAt,
    updatedAt: tournament.startsAt,
    skin: {
      title: tournament.skin.title,
      subtitle: tournament.skin.subtitle,
      imageUrl: tournament.skin.imageUrl ?? null,
      ctaLabel: tournament.skin.ctaLabel,
      tags: tournament.skin.tags,
    },
    changeLog: [],
    statusAudit,
    createdBy: {
      id: 'padlhub',
      login: 'padlhub',
      name: 'Padlhub',
    },
    updatedBy: {
      id: 'padlhub',
      name: 'Padlhub',
    },
    details: {
      statusAudit,
      sourceTournamentSnapshot: mapSnapshot(
        tournament.details?.sourceTournamentSnapshot,
      ),
    },
    format: tournament.format,
    gameId: tournament.gameId,
  };
}
