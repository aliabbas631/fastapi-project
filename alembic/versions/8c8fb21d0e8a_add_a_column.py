"""add a column

Revision ID: 8c8fb21d0e8a
Revises: b4ef8ba8c2f7
Create Date: 2026-06-30 14:46:27.677743

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8c8fb21d0e8a'
down_revision: Union[str, Sequence[str], None] = 'b4ef8ba8c2f7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column("followers", sa.Column("created_at", sa.TIMESTAMP(timezone=True), server_default=sa.text("now()"), nullable=False))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("followers", "created_at")
