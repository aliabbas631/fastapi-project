"""redo table followers

Revision ID: 2e99a4788d50
Revises: dc832d253445
Create Date: 2026-07-01 20:47:30.176403

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2e99a4788d50'
down_revision: Union[str, Sequence[str], None] = 'dc832d253445'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "followers",
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
        sa.Column("follower_id", sa.Integer, sa.ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table("followers")
