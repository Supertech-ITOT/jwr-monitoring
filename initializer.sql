INSERT INTO tag_master (
    ip_address,
    node_id,
    tag_name,
    parameter_id,
    room_id
)
SELECT
    'opc.tcp://127.0.0.1:48010' AS ip_address,
    'ns=2;s=Studio.Tags.Application.' || r.name || '_' || t.suffix AS node_id,
    r.name || '_' || t.suffix AS tag_name,
    t.parameter_id,
    r.id
FROM rooms r
CROSS JOIN (
    VALUES
        ('TE_AVG', 1),
        ('RH', 3),
        ('KWH',2),
        ('CURRENT',4),
        ('VOLTAGE',5),
        ('FREQUENCY',6),
        ('START_MAIN',7)
) AS t(suffix, parameter_id)
WHERE r.id BETWEEN 1 AND 30
ORDER BY r.id;